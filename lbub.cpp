#include<iostream>
#include<algorithm>
using namespace std;
int upperbound(int arr[],int n,int key)
{
    int l=0;
    int u= n-1;
    int ans=n;
    while(l<=u)
    {
        int mid=(l+u)/2;
        if(arr[mid]>key)
        {
            ans=mid;
            u=mid-1;
        }
        else
        {
            l=mid+1;
        }
    }
    return ans;
}
int lowerbound(int arr[],int n,int key)
{
    int l=0;
    int u= n-1;
    int ans=n;
    while(l<=u)
    {
        int mid=(l+u)/2;
        if(arr[mid]>=key)
        {
            ans=mid;
            u=mid-1;
        }
        else
        {
            l=mid+1;
        }
    }
    return ans;
}
int main()
{
    int arr1[]={5,1,1,2,3};
    int arr2[]={4,1,2,4,6};
    int n=5;
    sort(arr2,arr2+n);
    int sum=6;
    int c=0;
    for(int i=0;i<4;i++)
    {
        int key=sum-arr1[i];
    int lb=lowerbound(arr2,n,key);
    int ub=upperbound(arr2,n,key);
    c=c+(ub-lb);
    }
    cout<<c;
}